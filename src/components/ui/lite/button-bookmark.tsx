import { Bookmark } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

const ButtonBookMark = ({
  bookmarked,
  handleBookmark
}: {
  bookmarked: boolean;
  handleBookmark: () => void;
}) => (
  <button onClick={handleBookmark}>
    <Bookmark
      className={`${cn(
        'h-5 w-5 cursor-pointer transition-colors duration-300',
        {
          'fill-black stroke-black dark:fill-white dark:stroke-white':
            bookmarked,
          'fill-white stroke-black dark:fill-black dark:stroke-white':
            !bookmarked
        }
      )}`}
    />
  </button>
);

export default ButtonBookMark;
