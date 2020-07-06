# Demo component

Demo component is the main entry point of the project.

Its task is to assemble UI by combining several chat clients and display real-time updates on system design diagram.

We use [PHP](https://www.php.net) powered by [Apache](https://httpd.apache.org) web server for this demo because:
 * PHP is a popular scripting language for web
 * Apache is a popular web server which supports execution of PHP on server-side
 * DockerHub provides PHP+Apache official image which does not require extra setup

We use a small trick to overcome the limitation of using one browser window to show work of 6 different clients. Cookies are shared across domain, so half of the clients use `localhost` domain and other half - `127.0.0.1` domain. We also load them one after another - this guarantees load balancer assigning half of the clients to App server 1 and another half to App server 2.

More info:
 * [PHP installation](https://www.php.net/manual/en/install.php)