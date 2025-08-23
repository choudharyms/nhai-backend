# NHAI Smart Toilet Management System - Backend API

## Live API Endpoints
Base URL: https://YOUR_VERCEL_URL.vercel.app

### Available Endpoints:
- GET `/api/facilities` - Get all toilet facilities
- GET `/api/facility/:id` - Get specific facility (e.g., NH1)
- POST `/api/feedback` - Submit user feedback
- GET `/api/analytics` - Get dashboard analytics
- POST `/api/analyze-image` - AI image analysis simulation

## Example Response:
```json
{
  "success": true,
  "count": 20,
  "data": [...]
}
