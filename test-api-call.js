// Comprehensive test for all required permissions
const axios = require('axios');

async function testAllPermissions() {
  const ACCESS_TOKEN = 'IGAAKXfYfjwNBBZAFB6MFlsZATRoZA3RTeDB2VjhzbzVHT2d1NVZAEUmdTY1pSYm14RVVfel9CTnM3d3U3cnVyb0hFVVUtSWlyV2lpaWctc2N4VGhkTEJWUTZA5bExZAeHVUMUV2bVpIN3Nld2pIaEhEVVBxeW9zbzZAvS1lVRFEwRWg2awZDZD';
  const INSTAGRAM_USER_ID = '17841409813859177';
  
  const tests = [
    {
      name: 'instagram_manage_messages',
      url: `https://graph.instagram.com/v21.0/${INSTAGRAM_USER_ID}/conversations`,
      description: 'Testing messaging permission'
    },
    {
      name: 'instagram_manage_comments', 
      url: `https://graph.instagram.com/v21.0/${INSTAGRAM_USER_ID}/media`,
      description: 'Testing comments permission'
    },
    {
      name: 'pages_manage_metadata',
      url: `https://graph.facebook.com/v21.0/me/accounts`,
      description: 'Testing pages permission'
    }
  ];

  for (const test of tests) {
    try {
      console.log(`\n🧪 ${test.description}...`);
      const response = await axios.get(test.url, {
        headers: { 'Authorization': `Bearer ${ACCESS_TOKEN}` }
      });
      console.log(`✅ ${test.name}: SUCCESS (${response.status})`);
    } catch (error) {
      console.log(`❌ ${test.name}: ${error.response?.status || 'ERROR'}`);
      console.log(`   ${error.response?.data?.error?.message || error.message}`);
    }
  }
  
  console.log('\n🎉 All permission tests completed!');
  console.log('Wait 24 hours, then request advanced access for all successful permissions.');
}

testAllPermissions();
