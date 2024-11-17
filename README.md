# Expense Tracker
Software Development Bootcamp - Week 7 project - Built a Database Driven Full Stack React & Express App
## Features
- The App contains dynamic pages using react-route-dom, which can be accessed smoothly through any pages.
- The user must sign up for an account and log in to the main tracker screen.
- The App retrieves information by SQL from the database schema in Express server. Usernames, passwords, and all transactions are stored in the database, ensuring that each user has their own tracker.
- On the main screen, the user can add and delete transactions, updating the total balance in real time to reflect income and expenses. Colours update to suit income and expenses.
- Each user has an account with their own transactions.
- UI layout changes depending on screen size.
- The home page navbar contains log-in and sign-up buttons. Users can only access the tracker screen by logging in. Direct URL access is restricted.
  
### Future consideration
- Create a search bar so users can search for needed transactions.
- Create a scroll bar so only a few transactions show up on the main screen.
- Create multiple tracker screens within a single account, allowing users to manage multiple accounts for different purposes effortlessly.
- Add more UI features to make the app nicer.

## Reflection
### What requirements did you achieve?
All
### What was it that you found difficult about these tasks?
It took me some time to establish a relationship table between logged-in users and their transactions. Additionally, I initially struggled with creating a global context. At first, I had to import data into multiple components individually to make the app functional. However, after experimenting, I successfully implemented a global context, enabling seamless data sharing across multiple components.
### Were there any requirements or goals that you were unable to achieve?
I’m quite satisfied with the results so far. There are a few future enhancements, as listed above, that I’d love to implement in the app. Overall, I’m pleased with how the states are managed, and the app functions smoothly. I believe this app has the potential for widespread use, as managing expenses effectively is something we all need.



