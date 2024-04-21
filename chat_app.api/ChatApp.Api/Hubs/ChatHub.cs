using Microsoft.AspNetCore.SignalR;

namespace ChatApp.Api;

public class ChatHub : Hub
{
    private readonly IDictionary<string, UserConnection> _userConnections;

    public ChatHub(IDictionary<string, UserConnection> userConnections)
    {
        _userConnections = userConnections;
    }
    public async Task JoinRoom(UserConnection userConnection)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);

        _userConnections[Context.ConnectionId] = userConnection;

        await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", $"{userConnection.User} has joined {userConnection.Room}");

        await SendConnectedUsers(userConnection.Room);
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        if (_userConnections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
        {
            _userConnections.Remove(Context.ConnectionId);
            Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", $"{userConnection.User} has left");

        }
        return base.OnDisconnectedAsync(exception);
    }

    public async Task SendMessage(string message)
    {
        if (_userConnections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
        {
            await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", userConnection.User, message);
        }
    }


    public Task SendConnectedUsers(string room)
    {
        var users = _userConnections.Values
            .Where(c => c.Room == room)
            .Select(c => c.User);

        return Clients.Group(room).SendAsync("UsersInRoom", users);
    }

}
