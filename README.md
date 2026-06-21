# Liz's DIY Workshop

A fun, colorful website for Elizabeth's pretend company selling handmade squishy toys called "Squishes."

## Features

- **Multi-page website** with Home, About, and Shop pages
- **Interactive shop** with:
  - Pokeable squish animations
  - Shopping cart functionality
  - Pretend checkout process
  - Custom squish request form
- **Admin panel** for business management:
  - Secure login system
  - View all customer orders
  - Track order status (pending/fulfilled)
  - Business statistics dashboard
  - Manage and delete orders
  - Persistent order storage using localStorage
- **Responsive design** that works on mobile, tablet, and desktop
- **Accessibility features** including ARIA labels and keyboard navigation
- **Playful animations** with cute duck mascots

## Project Structure

```
lizs-diy-workshop/
├── index.html          # Home page
├── about.html          # About Elizabeth page
├── shop.html           # Shop and custom request page
├── css/
│   └── styles.css     # All styling
├── js/
│   └── script.js      # Shop functionality and cart logic
└── README.md          # This file
```

## How to Run

1. Open `index.html` in any modern web browser
2. Navigate between pages using the top navigation
3. Click on squishes to see them wiggle!
4. Add items to cart and try the pretend checkout

## Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, grid, flexbox, animations
- **Vanilla JavaScript** - No frameworks needed
- **Google Fonts** - Fredoka and Nunito fonts

## Notes

- This is a pretend store - no real payment processing
- Cart data is stored in memory only (resets on page refresh)
- All product data can be edited in `js/script.js` in the `squishes` array

## Created By

Mike Shipley for his daughter Elizabeth's pretend DIY workshop business.
