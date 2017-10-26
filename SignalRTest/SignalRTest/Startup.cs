
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(SignalRTest.Startup), "Configuration")]

namespace SignalRTest
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //Microsoft.AspNet.SignalR.StockTicker.Startup.ConfigureSignalR(app);

            app.MapSignalR();
        }
    }
}