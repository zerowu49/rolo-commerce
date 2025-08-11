# ROLO Commerce - Next.js E-commerce Website

A modern, responsive e-commerce website built with Next.js 14, TypeScript, and Tailwind CSS. This project showcases a coffee machine store with a clean, minimalist design.

## Features

- 🚀 **Next.js 14** with App Router
- 💎 **TypeScript** for type safety
- 🎨 **Tailwind CSS** for modern styling
- 📱 **Responsive design** for all devices
- 🔍 **Search functionality** for products
- 🛒 **Shopping cart** system
- ⚡ **Fast performance** with modern React patterns

## Screenshots

The website features:

- Clean header with ROLO branding
- Search bar with real-time filtering
- Product grid displaying Breville coffee machines
- Responsive design that works on all screen sizes
- Modern UI with hover effects and transitions

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd rolo-commerce
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
rolo-commerce/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles with Tailwind
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page component
├── components/             # React components
│   ├── Header.tsx         # Header with search and cart
│   ├── ProductGrid.tsx    # Product grid layout
│   └── ProductCard.tsx    # Individual product card
├── types/                  # TypeScript type definitions
│   └── product.ts         # Product interface
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Technologies Used

- **Frontend Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React useState
- **Build Tool**: Next.js built-in bundler

## Customization

### Adding New Products

Edit the `products` array in `app/page.tsx`:

```typescript
const products: Product[] = [
  {
    id: 5,
    name: "New Product",
    price: 299,
    description: "Product description",
    image: "/images/new-product.jpg",
    category: "Category",
  },
];
```

### Styling

Modify `tailwind.config.js` to customize colors, fonts, and other design tokens.

### Components

All components are modular and can be easily modified in the `components/` directory.

## Deployment

This project can be deployed to:

- Vercel (recommended for Next.js)
- Netlify
- Any static hosting service

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support or questions, please open an issue in the repository.
