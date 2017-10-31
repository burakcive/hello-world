using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading.Tasks;

namespace SignalRTest.SignalR.TestPage
{

    [HubName("messager")]
    public class MessagerHub : Hub
    {
        public static List<string> Users = new List<string>();


        public void Send(PositionToMark message)
        {
            Clients.All.sendMessage(message);
        }

        public void SendConnectedUsersCount(int count)
        {
            // Call the addNewMessageToPage method to update clients.
            var context = GlobalHost.ConnectionManager.GetHubContext<MessagerHub>();
            context.Clients.All.updateUsersOnlineCount(count);
        }


        public override Task OnConnected()
        {
            string clientId = GetClientId();

            if (Users.IndexOf(clientId) == -1)
            {
                Users.Add(clientId);
            }

            // Send the current count of users
            SendConnectedUsersCount(Users.Count);

            return base.OnConnected();
        }


        public override Task OnDisconnected(bool stopCalled)
        {
            string clientId = GetClientId();

            if (Users.IndexOf(clientId) > -1)
            {
                Users.Remove(clientId);
            }

            // Send the current count of users
            SendConnectedUsersCount(Users.Count);

            return base.OnDisconnected(stopCalled);
        }

        /// <summary>
        /// Get's the currently connected Id of the client.
        /// This is unique for each client and is used to identify
        /// a connection.
        /// </summary>
        /// <returns>The client Id.</returns>
        private string GetClientId()
        {
            string clientId = "";
            if (Context.QueryString["clientId"] != null)
            {
                // clientId passed from application 
                clientId = Context.QueryString["clientId"];
            }

            if (string.IsNullOrEmpty(clientId.Trim()))
            {
                clientId = Context.ConnectionId;
            }

            return clientId;
        }
    }

    public class Message
    {
        public string Name { get; set; }
        public string MessageToSend { get; set; }
    }

    public class PositionToMark
    {
        public double lat { get; set; }
        public double lng { get; set; }
        public string msg { get; set; }
        public string userName { get; set;}
    }
}