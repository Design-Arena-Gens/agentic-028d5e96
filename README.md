## Orange Blossom Alliance · Impact Tracker

A Next.js dashboard for monitoring donations, campaign momentum, and program impact for Orange Blossom Alliance. The experience is tuned for Vercel deployment and highlights nourishment, healing, and housing justice workstreams.

### Scripts

```bash
npm run dev    # start local development at http://localhost:3000
npm run build  # create an optimized production build
npm run start  # run the production build locally
```

### Features

- Donation pipeline with local persistence for new gift entries
- Campaign goal tracking and allocation breakdown visualizations
- Impact calculator to forecast meals, therapy minutes, and safe nights
- Curated community highlight cards for quick storytelling touchpoints

### Deployment

The project is ready for one-command deployment on Vercel:

```bash
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-028d5e96
```

After deploy, allow a few seconds for DNS to propagate before verifying the live site.
