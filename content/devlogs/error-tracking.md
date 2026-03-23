---
title: "The Importance of Error Tracking: Lessons from the PATH Project"
description: "How detailed error tracking helped us secure the PATH Project's website against botnet attacks."
date: 2026-03-23
---

Being the Engineering Team Lead at <a href="https://payattentiontohim.org/" target="_blank">The Pay Attention To Him (PATH) Project</a> and overseeing the development and launch of our website has been a great learning experience. From building on a low budget (sometimes no budget) to incident recovery, from communication to on-time delivery. But most importantly, I have learnt the importance of detailed error tracking and logging.

Over the last week, PATH's website has been the victim of attacks from bot farms whose IP addresses trace back to India, Russia, and other countries.

Not the kind of sentence I expected to write when I volunteered to lead the web team for a nonprofit. But here we are.

It started with a flood of Slack notifications, our error tracking system alerting us to repeated hits on endpoints like `/xmlrpc.php` and `/mcp/sse`. These aren't routes that exist on our site. They never did. But that didn't stop the bots.

Automated scanners sweep the internet daily, probing websites for known vulnerabilities, including WordPress admin panels, exposed environment files, and, most recently, MCP (Model Context Protocol) servers. They don't know your site is a small nonprofit. They don't care. They probe everything.

What made the difference was having the right visibility. Because we had detailed error tracking in place, we didn't just see that something was wrong; we saw exactly what was happening, where it was coming from, and what the bots were looking for. That clarity turned a potential panic into a calm, informed response.

Here's what I learned:

🔍 Error tracking isn't just for your own bugs. It's your first line of visibility into what's hitting your server, legitimate users and malicious actors alike.

📍 Context matters. Knowing the IP, location, user agent, and path of every error transformed noise into intelligence. We could immediately distinguish a real user from a botnet fuzzing our endpoints.

⚡ Observability on a budget is possible. We built our entire error tracking pipeline using PostHog (free tier), Slack webhooks, and a few hundred lines of TypeScript on our Nuxt.js stack. No expensive APM tools required.

🛡️ Every website is a target. If it's public, it will be probed. But your response should be intentional. We didn't panic. We read the logs, understood the pattern, and made informed decisions.

The PATH Project champions the growth, mental health, and well-being of the boy child, shining a light on the battles boys fight that the world too often ignores. Building and protecting that platform is a responsibility I don't take lightly.

Building for a nonprofit and want to talk about affordable observability? My DMs are open.

If you'd like to learn more about the work we do for the boy child, I'd love for you to check out our website and see for yourself. 👇🏾
