import ButtonBookMark from '@/components/ui/lite/button-bookmark';
import ButtonLike from '@/components/ui/lite/button-like';
import ButtonSend from '@/components/ui/lite/button-send';

const FooterLinkSection = ({ liteId }: { liteId: string }) => {
  return (
    <div className='mt-3 flex flex-row justify-between'>
      <div className='ms-0.5 flex flex-row gap-3'>
        <ButtonLike liteId={liteId} />
        {/* <Link href={`/posts/${lite._id}`}>
          <MessageCircle className='size-5 cursor-pointer' />
        </Link> */}
        <ButtonSend />
      </div>

      <ButtonBookMark liteId={liteId} />
    </div>
  );
};

export default FooterLinkSection;
