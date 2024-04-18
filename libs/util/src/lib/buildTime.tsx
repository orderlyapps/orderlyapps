import { timeToNow } from './timeToNow';


const formattedBuildTime = new Intl.DateTimeFormat('en-AU', {
  dateStyle: 'medium',
  timeStyle: 'short',
}).format(BUILD_TIME);

const timeDifference = timeToNow(BUILD_TIME);

export const buildTime = { timeDifference, formattedBuildTime };

export default buildTime;
