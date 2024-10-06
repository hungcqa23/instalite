import { Label } from '@/components/ui';
import Link from 'next/link';

import ButtonBookMark from '../button-bookmark';
import ButtonLike from '../button-like';
import ButtonSend from './button-send';

const FooterLinkSection = ({ liteId }: { liteId: string }) => {
  return (
    <div>
      <div className='mb-2 mt-3 flex flex-row justify-between'>
        <div className='ms-0.5 flex flex-row gap-3'>
          <ButtonLike liteId={liteId} />
          {/* <Link href={`/posts/${lite._id}`}>
            <MessageCircle className='size-5 cursor-pointer' />
          </Link> */}
          <ButtonSend />
        </div>

        <ButtonBookMark liteId={liteId} />
      </div>

      <Link href={`/posts/${liteId}`}>
        <Label className='hover:cursor-pointer'>View more comments</Label>
      </Link>
    </div>
  );
};

export default FooterLinkSection;
