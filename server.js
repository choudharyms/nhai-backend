const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Generate random data for simulation
const generateFacilityData = (id) => {
  const locations = [
    'Delhi-Mumbai Highway KM 145',
    'Bangalore-Chennai Highway KM 89',
    'Mumbai-Pune Highway KM 67',
    'Delhi-Jaipur Highway KM 123',
    'Hyderabad-Bangalore Highway KM 234'
  ];
  
  return {
    id: `NH${id}`,
    name: `Facility ${id}`,
    location: locations[id % locations.length],
    coordinates: {
      lat: 28.6139 + (Math.random() - 0.5) * 10,
      lng: 77.2090 + (Math.random() - 0.5) * 10
    },
    status: Math.random() > 0.2 ? 'active' : 'maintenance',
    sensors: {
      airQuality: Math.floor(Math.random() * 100),
      usage: Math.floor(Math.random() * 500),
      waterLevel: Math.floor(Math.random() * 100),
      cleanlinessScore: Math.floor(Math.random() * 10) + 1,
      temperature: 25 + Math.floor(Math.random() * 15),
      lastCleaned: new Date(Date.now() - Math.random() * 86400000).toISOString()
    },
    alerts: Math.random() > 0.7 ? ['Low soap level', 'Maintenance required'] : [],
    userRating: (Math.random() * 5 + 3).toFixed(1),
    dailyUsers: Math.floor(Math.random() * 1000) + 100,
    lastUpdated: new Date().toISOString()
  };
};

// Generate sample data for 20 facilities
const facilities = Array.from({length: 20}, (_, i) => generateFacilityData(i + 1));

// API Routes
app.get('/', (req, res) => {
  res.json({
    message: "NHAI Smart Toilet Management System API",
    version: "1.0",
    endpoints: [
      "GET /api/facilities",
      "GET /api/facility/:id",
      "POST /api/feedback",
      "GET /api/analytics"
    ]
  });
});

// Get all facilities
app.get('/api/facilities', (req, res) => {
  res.json({
    success: true,
    count: facilities.length,
    data: facilities
  });
});

// Get specific facility
app.get('/api/facility/:id', (req, res) => {
  const facility = facilities.find(f => f.id === req.params.id);
  if (!facility) {
    return res.status(404).json({
      success: false,
      message: 'Facility not found'
    });
  }
  
  // Update with fresh random data to simulate real-time
  facility.sensors.cleanlinessScore = Math.floor(Math.random() * 10) + 1;
  facility.sensors.usage = Math.floor(Math.random() * 500);
  facility.lastUpdated = new Date().toISOString();
  
  res.json({
    success: true,
    data: facility
  });
});

// Submit feedback
app.post('/api/feedback', (req, res) => {
  const { facilityId, rating, comment } = req.body;
  
  // Simulate processing feedback
  res.json({
    success: true,
    message: 'Feedback submitted successfully',
    data: {
      facilityId,
      rating,
      comment,
      timestamp: new Date().toISOString()
    }
  });
});

// Get analytics data
app.get('/api/analytics', (req, res) => {
  const analytics = {
    totalFacilities: facilities.length,
    activeFacilities: facilities.filter(f => f.status === 'active').length,
    averageRating: (facilities.reduce((sum, f) => sum + parseFloat(f.userRating), 0) / facilities.length).toFixed(1),
    totalDailyUsers: facilities.reduce((sum, f) => sum + f.dailyUsers, 0),
    alertCount: facilities.reduce((sum, f) => sum + f.alerts.length, 0),
    costSavings: {
      monthly: '₹4,32,000',
      annual: '₹51,84,000'
    },
    maintenanceStats: {
      scheduled: 15,
      completed: 12,
      pending: 3
    }
  };
  
  res.json({
    success: true,
    data: analytics
  });
});

// Simulate AI image analysis
app.post('/api/analyze-image', (req, res) => {
  // Simulate processing time
  setTimeout(() => {
    const score = Math.floor(Math.random() * 10) + 1;
    res.json({
      success: true,
      data: {
        cleanlinessScore: score,
        confidence: '94%',
        issues: score < 5 ? ['Needs cleaning', 'Low supplies'] : ['Good condition'],
        recommendation: score < 5 ? 'Immediate cleaning required' : 'Maintain current standards',
        analysisTime: '2.3 seconds'
      }
    });
  }, 2000);
});

app.listen(PORT, () => {
  console.log(`🚀 NHAI API Server running on http://localhost:${PORT}`);
  console.log(`📊 Analytics: http://localhost:${PORT}/api/analytics`);
  console.log(`🏢 Facilities: http://localhost:${PORT}/api/facilities`);
});