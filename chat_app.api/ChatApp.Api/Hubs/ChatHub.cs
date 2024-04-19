﻿using Microsoft.AspNetCore.SignalR;

namespace ChatApp.Api;

public class ChatHub : Hub
{
    public async Task JoinRoom(UserConnection userConnection)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);
        await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", $"{userConnection.User} has joined {userConnection.Room}.");
    }
}