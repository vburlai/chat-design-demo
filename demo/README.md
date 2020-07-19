# Demo component

Demo component is the main entry point of the project.

Its task is to assemble UI by combining several chat clients and display real-time updates on system design diagram.

We use [PHP](https://www.php.net) powered by [Apache](https://httpd.apache.org) web server for this demo because:
 * PHP is a popular scripting language for web
 * Apache is a popular web server which supports execution of PHP on server-side
 * DockerHub provides PHP+Apache official image which does not require extra setup

We use a small trick to overcome the limitation of using one browser window to show work of 6 different clients.
> Load balancer uses `SERVERID` cookie to keep the session consistent.
 >
 > Since cookies are shared accross domain we had to make half of clients connect to http://localhost:3002/ and another half to http://127.0.0.1:3002/ (which is exactly the same entity but technically different domain names).
 >
 > This way `localhost` gets `SERVERID=app-server-cookie-1` cookie and `127.0.0.1` gets `SERVERID=app-server-cookie-2`.

More info:
 * [PHP installation](https://www.php.net/manual/en/install.php)