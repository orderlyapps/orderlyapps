import {
  format,
  formatDistanceToNow
} from 'date-fns';

export const buildTime = {
  timeDifference: formatDistanceToNow(BUILD_TIME, { addSuffix: true }),
  formattedBuildTime: format(BUILD_TIME, "PP 'at' h:mmaaa"),
};

export default buildTime;
