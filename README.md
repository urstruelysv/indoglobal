# Elite Academy Website

A premium, modern school website built with Next.js and Tailwind CSS. Features a responsive design, admission form processing, and an admin dashboard for managing submissions.

## Features

- **Premium Design**: Elegant typography with Playfair Display (headings) and Inter (body text)
- **Responsive Layout**: Mobile-first design that works perfectly on all devices
- **Hero Section**: Eye-catching landing area with admission form
- **About Section**: School information with key values and highlights
- **Gallery**: Showcase campus images with lightbox functionality
- **Location**: Map placeholder and contact information
- **Contact Form**: Multi-field contact form for inquiries
- **Admin Dashboard**: View and manage all submissions at `/admin`
- **Data Persistence**: Submissions stored in JSON files (can be upgraded to a database)

## Color Palette

- **Primary**: Navy Blue (#0F2438) - Trust and authority
- **Secondary/Accent**: Gold (#C9A961 / #D4AF37) - Premium and excellence
- **Neutral**: Ivory (#FAFAF8) and Grays - Sophistication and clarity

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm

### Installation

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Run the development server:**
   ```bash
   pnpm dev
   ```

3. **Open in browser:**
   Navigate to `http://localhost:3000`

## Project Structure

```
app/
├── layout.tsx              # Root layout with fonts
├── page.tsx               # Main landing page
├── globals.css            # Global styles and theme
├── api/
│   ├── admissions/        # Admission form API
│   └── contact/           # Contact form API
└── admin/
    └── page.tsx           # Admin dashboard

components/
├── Header.tsx             # Navigation header
├── HeroSection.tsx        # Hero section with admission form
├── AboutSection.tsx       # About the school
├── GallerySection.tsx     # Image gallery
├── LocationSection.tsx    # Location and contact info
├── ContactSection.tsx     # Contact form
└── Footer.tsx            # Footer

data/
├── admissions.json        # Stored admission applications
└── contacts.json          # Stored contact messages
```

## Key Pages

- **Home** (`/`) - Main landing page with all sections
- **Admin** (`/admin`) - Dashboard to view all submissions and export data as CSV

## Forms

### Admission Form
- Parent Name (required)
- Student Date of Birth (required)
- Phone Number (required)
- Class Applying For (required)
- Email (optional)

### Contact Form
- Name (required)
- Email (required)
- Phone (optional)
- Subject (required)
- Message (required)

## Customization

### Update Content
All content is structured with placeholder text that can be easily replaced:
- School name: Change "Elite Academy" throughout
- Tagline and descriptions: Update in HeroSection and AboutSection
- Contact info: Update in LocationSection and Footer

### Modify Colors
Update the CSS variables in `app/globals.css`:
```css
:root {
  --primary: #0F2438;        /* Navy blue */
  --secondary: #D4AF37;      /* Gold */
  --accent: #C9A961;         /* Light gold */
  /* ... other colors ... */
}
```

### Change Fonts
Fonts are configured in:
1. `app/layout.tsx` - Font imports
2. `tailwind.config.ts` - Font family mapping
3. `app/globals.css` - Font CSS classes

## Data Storage

Currently, form submissions are stored in JSON files in the `/data` directory. For production use, consider:
- Upgrading to a database (PostgreSQL, MongoDB, etc.)
- Adding email notifications for submissions
- Implementing authentication for the admin dashboard
- Adding form validation on the server

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Production Deployment

1. **Prepare for deployment:**
   ```bash
   pnpm build
   ```

2. **Deploy to Vercel:**
   - Connect your GitHub repository
   - Vercel will automatically detect and deploy

3. **Environment Variables:**
   - No environment variables required for basic functionality
   - Add any needed for email notifications, database, etc.

## Future Enhancements

- [ ] Database integration (Supabase, MongoDB)
- [ ] Email notifications for form submissions
- [ ] Authentication for admin dashboard
- [ ] Image uploads for gallery
- [ ] Multi-language support
- [ ] Blog section for news/announcements
- [ ] Event calendar
- [ ] Student testimonials section
- [ ] Virtual campus tours
- [ ] Online payment integration

## Support

For questions or issues, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

## License

This project is private and proprietary to Elite Academy.
