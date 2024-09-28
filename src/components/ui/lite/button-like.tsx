import { Heart } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

const ButtonLike = ({
  liked,
  handleLike
}: {
  liked: boolean;
  handleLike: () => void;
}) => (
  <button onClick={handleLike}>
    <Heart
      className={`${cn(
        'h-5 w-5 cursor-pointer transition-colors duration-300',
        {
          'fill-red-500 stroke-red-500': liked,
          'fill-white stroke-black dark:fill-black dark:stroke-white': !liked
        }
      )}`}
    />
  </button>
);

export default ButtonLike;
