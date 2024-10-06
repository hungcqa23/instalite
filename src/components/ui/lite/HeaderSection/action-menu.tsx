import { EllipsisIcon, SparkleIcon, TrashIcon, UserMinusIcon, UserPlus } from '@/components/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui';
import { Button, toast } from '@/components/ui';
import {
  useFollowMutation,
  useGetIsFollowingQuery,
  useUnFollowMutation
} from '@/hooks/queries/useFollow';
import { Post } from '@/types/schema-validations/post.schema';

interface ActionMenuProps {
  lite: Post;
  isCurrentUser: boolean;
  handleSummarization: () => void;
  setOpenDeleteDialog: (open: boolean) => void;
}

const ActionMenu: React.FC<ActionMenuProps> = ({
  lite,
  isCurrentUser,
  handleSummarization,
  setOpenDeleteDialog
}: ActionMenuProps) => {
  // Follow
  const { data: isFollowingData, isLoading: isFollowingLoading } = useGetIsFollowingQuery(
    lite.userId.username
  );
  const isFollowing = isFollowingData?.data || false;

  //  Follow / unfollow mutations
  const followMutation = useFollowMutation();
  const unFollowMutation = useUnFollowMutation();

  const handleFollowClick = () => {
    if (isFollowing) {
      unFollowMutation.mutate(lite.userId._id);
      toast({
        title: 'Unfollowed',
        description: `You have unfollowed @${lite.userId.username}`
      });
    } else {
      followMutation.mutate(lite.userId._id);
      toast({
        title: 'Followed',
        description: `You have followed @${lite.userId.username}`
      });
    }
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant='link' className='me-1 h-5 w-5 px-0'>
          <EllipsisIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='-ms-3 w-56 rounded-lg py-2 shadow-default'>
        {!isCurrentUser && (
          <DropdownMenuItem className='cursor-pointer gap-2' onClick={handleFollowClick}>
            {isFollowing ? <UserMinusIcon className='size-4' /> : <UserPlus className='size-4' />}
            <span>{isFollowing ? 'Unfollow' : `Follow @${lite.userId.username}`}</span>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem className='cursor-pointer gap-2' onClick={handleSummarization}>
          <SparkleIcon className='size-4' />
          <span>Explain with Relite AI</span>
        </DropdownMenuItem>

        {isCurrentUser && (
          <DropdownMenuItem
            className='cursor-pointer gap-2'
            onClick={() => setOpenDeleteDialog(true)}
          >
            <TrashIcon className='size-4' />
            <span>Delete lite</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionMenu;
