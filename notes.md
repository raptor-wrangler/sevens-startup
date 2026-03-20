# cs260-notes

[Connect 4 Gaming](https://startup.seven-wonders.click)

## course-links

- [Course instruction](https://github.com/webprogramming260)
- [Mastery LS Schedule](https://masteryls.com/course/1a8c01d0-5e9c-4a7c-8597-55bd5159967e/topic/2680f434-f121-46bd-a858-5fb6d656a3df)
- [Canvas](https://byu.instructure.com)

## dev-help
- [Dev Roadmaps](https://roadmap.sh/roadmaps/)
- [MDN](https://developer.mozilla.org)

## AWS

My IP address is: 54.235.103.29

The command to remote access my web server: ssh -i /home/seven-wonders/Documents/startup/7serverkp.pem ubuntu@54.235.103.29

### Routing Notes 1/15/2026
HOW DOMAIN NAMES WORK: Search Domain name, computer searches DNS for the appropriate IP address, requests IP address from the server to load the page. Localhost is 127.0.0.1 - it goes to your own computer. 

DNS RECORDS: An A record is an address record that points to an IP address. This is what is finally returned. CNAME is a record that you stick in the registry that points to a different IP address or domain name. It's an alias that points to an A record that will then finally return the IP address. ICANN are the Domain name authorities who lease to Registrars who put domain names in a Registery.

## HTML

HTML is easier than I thought it would be. I't just a big tree with many branches. There are plenty of things that I didn't even touch when it comes to html elements, but I want there to be plenty of time to do my CSS.

## CSS

It stands for Cascading Style Sheets! Rules program the vision. You can do inline styling or make a rule. For rules, this is the html element to change all of ->p {color: green}. You can also do a link to another .css file with <link rel="stylesheet" href="styles.css" />. 

Other selectors exist. There are elements linke p and div, then there's IDs which are specific elements marked with a hashtag- #root marked with id=root. There's classes wich work like IDs for all elements in a specific class - .highlight. Element class selectors which apply to any elements with a specific class. p.highlight would only apply to p elements with class='highlight.' List works by applying this delcaration block to selectors (body, section), descendents do any descendant of the element (body section). Child is a list of direct children (section > p). Pseudo is state-based, so we can change it based of hover (p:hover)

Many properties exist, too. There's background-color, border (color, width, style), color, display, font (size, family, style), margin, padding, display (block, inline, or none)

Tp grab a font off the internet: @font-face or @import url(link);

Everything in CSS is a box! Inside is the content (background color) -> padding (background color) -> border (diff color) -> margin (diff color and can specify for all different sides)

## React Part 1: Routing

JAVASCRIPT BASICS - made by Brandon Ikes (use ===)
It's an interpreted language. Browsers have an interpreter built in. We will have to install an interpreter on our server. It is dynamically typed!
Node.js allows to run JS outside the browser. V8 is the interpreter in Chrome, someone made it into the terminal

React is just Javascript code. It's what boostrap is for css but for javascript. 2 Main techs in react: JSX (combines html and javascript) and components. IMPORT REACT AT THE TOP OF A JS FILE.
  JSX: You need a transpiler (babel) which translates the JSX into JS which then is made into HTML and rendered. We will installl Vite which will run our code through Babel. It's purpose is to replace your need to directly interact with the DOM. 
  COMPONENTS: header, main, footer. It allows you to change just one of these components/reduce redundant code. A component is just a function. It returns JSX (which will then turn to HTML). To inject it into the HTML, you must find the component, put it into a root element and then call render on it. const root = ReactDOM.createRoot(document.querySelector([#id])). It replaces the child of the element but not the element itself.
  PROPERTIES: basically a parameter that you define in your render call and use in the return of your JSX function. Use curly braces. Destructure a bigger object into something smaller.
  STATE: react is an event-driven library. It manages variables itself asycnchronously. React.useState([default value])
  ROUTER: We will have 1 HTML page and inject a differnt HTML page based on interaction. There's only going to be about 10 lines to import JSX and update the code. We will basically componentize all of our HTML. Instead of anchors, use NavLink.


Setting up Vite and React was pretty simple. I had a bit of trouble because of conflicting CSS. This isn't as straight forward as you would find with Svelte or Vue, but I made it work in the end. If there was a ton of CSS it would be a real problem. It sure was nice to have the code structured in a more usable way.

## React Part 2: Reactivity
i lost my notes :(

## Service
It's up to the service to send whatever you're requesting. We don't get to control the results. These calls are called endpoints. You declare what the endpoint does, and what parameters it takes. In the HTTP protectol, the address is paired with a verb which is like a command. [post]-creation [get]-getting some information.

Your service can call other services like databases with the fetch command. Servers have to be asked to do something. It doesn't work otherwise. We use the promises so that it's async and things can still work while the server tries to fetch it.

``` jsx
fetch(url) {options} //this promises to get you a response object
  .then(r => r.json()) //this is needed because fetch is just a promise that it will return once it's been fetched. This is only information about the request - the response object. the .json() also returns a promise. r is just a variable
  .then(j => console.log(j)) //j is just a variable - this finally shows the stuff we got
```
OR
``` jsx
const r = await fetch(url) //this just looks nicer and is a little easier to debug.
const j = await r.json()
console.log(j)
```

https://byu.edu:443/api/city?q=pro#3
SCHEME: https
DOMAIN: byu.edu
PORT: 443
PATH: /api/city
PARAMETERS: ?q=pro (query that searches for and city that contains 'pro')
ANCHOR: #3

Ports are like ship docking. You connect with one port but it will transfer you to a different port so you can dock as well as so many other people. We use Caddy in order to forward our subdomain navigation to ports. This is called a reverese proxy. That's what our websites do!

SPECIFIC PROTOCOLS: THIS IS SUPER COOL! 20 - file transfer protocol | 22 - SSH | 2 - mail

Requests:
POST /user HTTP/1.1
Host: cs260.click
User-Agent: curl/7.77.0
Content-Length: 14
Accept: application/json, text/plain, */*
accept-encoding: gzip, deflate
{"name":"Tim"}

Responses:
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 15
Content-Encoding: gzip
{"id":"12", "name":"tim"}

CACHING
Keeping something you've learned before and holding onto it.

WEB SERVICES
Service design: make a uml sequence diagram to see where the server is needed. This will help us determine the method and endpoint he has. Will need login, logout, create account endpoints for sure. 

Authentication: I know who you are
Authorization: I know what you can do
SECURELY STORING PASSWORDS
 - must encrypt the password so that not even YOU know their password. Use a cryptographic hash function that you cannot reverse. You'll remember the hash, but never remember the actual password. Salts make everything unique even if the password is the same.
 - We will use Bcrypt, import it, and then call 2 functions with it.

 AUTHENTICATION TOKENS
 - use uuid package to generate almost unique token. 
 - use cookies Set-Cookie, give it a key, and then pass the new uuid we got. Then you can put a whole bunch of parameters on it. You can set the cookie to expire and it would force the user to login again!
 - every request looks at the token
 - import npm package cooke-parser

 ## Database
 There are many database options. SQL is a relational query option that is very powerful. We will use MongoDB that stores JSON objects.
 IT LOOKS LIKE THIS: (its just an array!)
[
  {
    _id: '63b9da7f79',
    name: 'Mystery player',
    score: 0,
    $date: '1/7/2023',
  },
  {
    _id: '63bdf9d855',
    name: '지안@id.com',
    $date: '1/10/2023',
  },
];

MONGO DB Setup
Install: npm install mongodb
Connection String: mongodb+srv://seven:{PSWD}@cluster0.oytpn7l.mongodb.net/?appName=Cluster0

## Testing
framing the problem / code / debugging / testing - these are the vital pillars of coding

Make test code modular - put it in a different file.
Jest and Playwright

## Websocket
it's just an upgrade of HTTP. It has widespread support because it's just HTTP
Make a request to the serve with the headers of Upgrade: websocket and Connection: Upgrade. That's how to make an HTTP request into a websocket request.
Initiate a websocket connection to the backend on both ends. This is proxy peer-to-peer.
The live server vscode extention was using websocket!