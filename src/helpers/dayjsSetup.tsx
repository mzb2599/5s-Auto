// src/dayjsSetup.js
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';

// Extend dayjs with required plugins
dayjs.extend(advancedFormat);
dayjs.extend(localizedFormat);

// Export dayjs for use in other parts of your app
export default dayjs;
