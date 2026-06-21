# Contributing to Liz's DIY Workshop

Thanks for your interest in contributing! This is a learning project for Elizabeth, so we welcome contributions that help improve the code quality and teach best practices.

## How to Contribute

### 1. Fork the Repository
Click the "Fork" button at the top right of the repository page.

### 2. Clone Your Fork
```bash
git clone https://github.com/YOUR-USERNAME/lizs-diy-workshop.git
cd lizs-diy-workshop
```

### 3. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

Branch naming conventions:
- `feature/` - New features (e.g., `feature/product-reviews`)
- `fix/` - Bug fixes (e.g., `fix/cart-calculation`)
- `docs/` - Documentation updates
- `refactor/` - Code improvements without changing functionality

### 4. Make Your Changes

- Write clean, readable code
- Follow the existing code style
- Test your changes in multiple browsers
- Make sure the site works on mobile

### 5. Commit Your Changes
```bash
git add .
git commit -m "Add clear description of what you changed"
```

Good commit messages:
- ✅ "Add product filtering by color"
- ✅ "Fix cart total calculation bug"
- ❌ "Updated files"
- ❌ "WIP"

### 6. Push to Your Fork
```bash
git push origin feature/your-feature-name
```

### 7. Create a Pull Request

1. Go to the original repository
2. Click "New Pull Request"
3. Select your fork and branch
4. Write a clear description of what you changed and why
5. Submit!

## Code Style Guidelines

### HTML
- Use semantic HTML5 elements
- Include ARIA labels for accessibility
- Keep inline styles to a minimum

### CSS
- Use CSS custom properties for colors and spacing
- Mobile-first responsive design
- Meaningful class names

### JavaScript
- Use modern ES6+ syntax
- Clear function names that describe what they do
- Comments only when necessary to explain "why", not "what"
- No external dependencies - keep it vanilla JS

## Testing Checklist

Before submitting a PR, please test:
- [ ] Desktop browsers (Chrome, Firefox, Safari)
- [ ] Mobile browsers (iOS Safari, Chrome)
- [ ] All navigation links work
- [ ] Shopping cart functions correctly
- [ ] Admin panel (if changes affect it)
- [ ] Accessibility (keyboard navigation, screen readers)

## Questions?

Open an issue or reach out! We're here to learn together.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
