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

JAVASCRIPT BASICS - made by Brandon Ikes
It's an interpreted language. Browsers have an interpreter built in. We will have to install an interpreter on our server. It is dynamically typed!

Node.js allows to run JS outside the browser. V8 is the interpreter in Chrome, someone made it into

Setting up Vite and React was pretty simple. I had a bit of trouble because of conflicting CSS. This isn't as straight forward as you would find with Svelte or Vue, but I made it work in the end. If there was a ton of CSS it would be a real problem. It sure was nice to have the code structured in a more usable way.

## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```
