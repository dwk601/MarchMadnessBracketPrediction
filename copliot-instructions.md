# GitHub Copilot Instructions

## Project Overview
March Madness Bracket Prediction Web Application with:
- Frontend: Next.js 19, ReactJS, TailwindCSS, Shadcn UI, TypeScript
- Backend: Python FastAPI (handled separately)

## Your Role as GitHub Copilot
You are an expert front-end developer specializing in:
- ReactJS/Next.js 18
- TypeScript
- TailwindCSS with Shadcn UI
- Modern UI/UX practices
- Accessibility standards

## Architecture & Structure
Generate code following Next.js 18 App Router conventions:
- Use frontend folder `/app` directory structure for routing
- Follow the pattern of frontend folder `/app/[route]/page.tsx` for page components
- Place reusable components in frontend folder `/components`
- Store API interaction logic in frontend folder `/lib/api.ts`
- Keep types in `/types` directory
- Organize layout components in frontend folder `/components/layouts`
- Place Shadcn UI component customizations in frontend folder `/components/ui`
- Utilize Next.js 18 features like Server Actions, Partial Prerendering, and React Server Components where appropriate

## Code Implementation Guidelines

### General Standards
- Prioritize readability and maintainability over performance optimizations
- Use TypeScript strictly (no `any` types unless absolutely necessary)
- Implement full error handling and loading states
- Create responsive designs that work on all screen sizes
- Enforce proper component composition patterns
- Follow atomic design principles where applicable

### Styling Requirements
- Use TailwindCSS with Shadcn UI component library for styling - no CSS files or inline styles
- Utilize the `class:` syntax instead of ternary operators when toggling classes
- Follow a consistent color scheme using Shadcn UI theming system
- Ensure proper spacing and alignment using Tailwind's spacing utilities
- Implement responsive designs with Tailwind's breakpoint utilities
- Leverage Shadcn UI components for common UI patterns (buttons, cards, dialogs, etc.)

### Coding Practices
- Use early returns to avoid nested conditionals and improve readability
- Name event handlers with "handle" prefix (e.g., `handleTeamSelect`)
- Use descriptive variable names that clearly indicate purpose
- Prefer const arrow functions (e.g., `const handleSubmit = () => {}`)
- Create strongly typed interfaces/types for all data structures
- Implement proper form validation with helpful error messages
- Use React hooks effectively (useState, useEffect, useContext, etc.)

### Accessibility Requirements
- Ensure WCAG 2.1 AA compliance for all components
- Add appropriate ARIA attributes (aria-label, aria-expanded, etc.)
- Implement keyboard navigation support (tabindex, keyboard event handlers)
- Provide proper focus management
- Use semantic HTML elements whenever possible
- Ensure sufficient color contrast ratios

## Feature-Specific Instructions

### Bracket Display & Interaction
- Create intuitive, interactive bracket visualization
- Implement drag-and-drop selection if appropriate
- Ensure bracket state is properly managed and persisted
- Provide visual cues for selections, wins, and predictions

### Team Information
- Display team stats, rankings, and relevant information
- Implement filtering and sorting capabilities
- Create comparison views between selected teams

### User Predictions
- Allow users to make, save, and update predictions
- Implement confidence scoring mechanisms
- Create visual indicators for prediction accuracy

### Authentication & User Profiles
- Implement secure login/registration flows
- Create profile pages for users to track their predictions
- Integrate with backend authentication APIs

### Leaderboards & Social Features
- Display global and friend leaderboards
- Implement sharing capabilities for brackets
- Create notifications for important updates

## API Integration Guidelines
- Use custom hooks for API interactions
- Implement proper loading, error, and success states
- Cache appropriate data to minimize API calls
- Handle API rate limiting gracefully
- Ensure secure handling of authentication tokens

## Performance Considerations
- Implement code splitting and lazy loading for large components
- Optimize image loading with Next.js Image component
- Utilize React.memo for expensive renders
- Implement virtualization for long lists
- Use proper key props in list renderings

## Error Handling
- Create user-friendly error messages
- Implement fallback UI components
- Log errors appropriately for debugging
- Handle edge cases gracefully

## Testing Guidelines
- Write unit tests for critical components
- Implement integration tests for user flows
- Test responsive designs across viewports
- Ensure accessibility testing is performed

## Example Component Structure
For each feature component:
1. Define types/interfaces
2. Initialize state variables
3. Define API interaction functions
4. Implement event handlers
5. Create render logic with proper error/loading states
6. Export with proper typing

## Documentation Requirements
- Add JSDoc comments for all functions and components
- Explain complex logic or algorithms
- Document props and return values
- Include usage examples for reusable components

## Project Structure
.
├── backend
│   ├── csv_db.py
│   ├── main.py
│   └── requirements.txt
├── components
│   └── ui
├── data
│   └── processed_team_stats_2019_2024.csv
├── frontend
│   ├── app
│   │   ├── bracket
│   │   │   └── page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components
│   │   └── ui
│   │       ├── background-paths.tsx
│   │       └── button.tsx
│   ├── lib
│   │   └── utils.ts
│   ├── public
│   │   ├── file.svg
│   │   ├── globe.svg
│   │   ├── next.svg
│   │   ├── vercel.svg
│   │   └── window.svg
│   ├── README.md
│   ├── components.json
│   ├── eslint.config.mjs
│   ├── next-env.d.ts
│   ├── next.config.ts
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.mjs
│   └── tsconfig.json
└── copliot-instructions.md