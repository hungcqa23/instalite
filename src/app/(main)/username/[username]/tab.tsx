'use client';

import { useAppContext } from '@/app/context/app-context';
import LiteItem from '@/components/ui/LiteItem';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User } from '@/schema-validations/account.schema';
import { Bookmark, Grid2X2, ImageIcon, Repeat2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function Tab({
  user
}: {
  user: User & {
    is_following: boolean;
  };
}) {
  const { user: currentUser } = useAppContext();

  return (
    <div className='mt-[31px]'>
      <Tabs defaultValue='post' className='w-full'>
        <TabsList className='flex w-full justify-between rounded-none border-b bg-transparent p-0 dark:bg-transparent'>
          <Link href='/me'>
            <TabsTrigger
              className='shadow-none data-[state=active]:shadow-none  relative flex h-9 w-32 gap-1.5 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 text-base font-semibold uppercase text-muted-foreground transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground'
              value='post'
            >
              <Grid2X2 className='h-8 w-8 md:h-6 md:w-6' />{' '}
              <span className='hidden md:inline'>Lite</span>
            </TabsTrigger>
          </Link>

          <TabsTrigger
            className='shadow-none data-[state=active]:shadow-none  relative flex h-9 w-32 gap-1.5 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 text-base font-semibold uppercase text-muted-foreground transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground'
            value='image'
          >
            <ImageIcon className='h-8 w-8 md:h-6 md:w-6' />{' '}
            <span className='hidden md:inline'>Image</span>
          </TabsTrigger>

          <Link href='/me/saved'>
            <TabsTrigger
              className='shadow-none data-[state=active]:shadow-none relative flex h-9 w-32 gap-1.5 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 text-base font-semibold uppercase text-muted-foreground transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground'
              value='saved'
            >
              <Bookmark className='h-8 w-8 md:h-6 md:w-6' />
              <span className='hidden md:inline'>Saved</span>
            </TabsTrigger>
          </Link>
        </TabsList>

        <TabsContent value='post' className='text-sm'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur,
          laudantium laboriosam. Impedit incidunt distinctio in ea sequi, ipsum
          nam laborum quisquam quidem recusandae eius quas fugit dolores quia,
          quod consectetur. Maxime quos quis ratione? Officia, illum! Laborum
          excepturi ducimus adipisci suscipit hic mollitia totam tempora
          inventore ex quaerat. Ratione dignissimos eum ipsa voluptatem animi!
          Earum incidunt atque similique ratione rem! Reprehenderit, nulla.
          Officia repudiandae eius quisquam molestiae laborum quam magnam
          praesentium, voluptatum, nihil excepturi accusantium recusandae
          aspernatur rerum? Repellat et quasi, quis nesciunt velit odio
          consectetur quidem delectus voluptates nobis? Non incidunt maxime
          placeat deleniti perferendis, a quis quasi delectus error temporibus,
          eveniet tempora possimus commodi sunt perspiciatis nihil magni. Sit
          quae odio obcaecati doloribus minima quas est debitis vero? Laboriosam
          sint adipisci corporis quas expedita ullam? Quaerat est debitis
          facilis commodi quae consectetur iure mollitia, aspernatur nulla quis
          veniam, odio, amet tempora placeat culpa minima molestiae ducimus
          praesentium natus. Sit asperiores, corporis odit ab officiis modi
          tempora impedit quisquam ad suscipit vel voluptatem soluta cupiditate
          dolores tenetur dicta sint cum nam consequatur nobis. Voluptatum vel
          quis impedit aut. Numquam? Eos impedit adipisci, pariatur corrupti
          ducimus asperiores maxime, libero fuga dolor quia eveniet. Ea
          perferendis tempora nemo quam quo modi, similique, officiis adipisci
          hic praesentium, cupiditate eligendi iste esse tenetur. Commodi minima
          explicabo veritatis totam praesentium repellendus! Eaque culpa
          accusantium totam veritatis velit aliquam, maiores quasi sint numquam
          rerum itaque, provident alias tenetur voluptatum quas modi consectetur
          sapiente, harum deserunt. Nisi blanditiis perferendis cupiditate
          molestias mollitia error, culpa repudiandae necessitatibus ullam earum
          eligendi distinctio asperiores temporibus laboriosam debitis,
          molestiae accusantium consequatur. Dolor corrupti exercitationem
          dolore, incidunt explicabo a ut vel? Cupiditate officia expedita
          numquam ut magnam. Dolorum nemo placeat voluptate eligendi ducimus
          nulla quasi dolor perferendis expedita iure veniam labore sint debitis
          fugit voluptas repudiandae, vero aut consequuntur ex eius. Maxime non
          incidunt laudantium assumenda quis repudiandae alias facere, quae
          magnam, minima magni, inventore labore odit distinctio quia quasi amet
          tempore harum molestiae. Vel eius, perspiciatis nihil libero nostrum
          facilis. Fugit nostrum natus nisi labore neque, accusantium dolorem
          sit distinctio repellat dolores, temporibus deserunt illum facere
          ipsa, voluptatum quia eum veritatis quae! Facere iste magni magnam
          culpa cumque repellat nostrum. Magni, modi veniam commodi, voluptatem
          rem laudantium consectetur placeat doloremque ratione asperiores
          perspiciatis amet ullam, cum nisi distinctio ipsam perferendis? Ab
          obcaecati eos autem. Harum eaque deserunt fugiat nihil ratione. Aut
          magnam nisi nobis aspernatur! Saepe necessitatibus illo dicta sit sunt
          consequuntur alias aperiam nihil modi harum ut ex repudiandae numquam,
          atque velit a dignissimos earum voluptatem recusandae repellat dolore.
          Eligendi deleniti laboriosam delectus vel officiis laudantium et eum!
          Facilis quia illum recusandae facere, molestiae itaque incidunt
          expedita. A libero porro maiores tempore necessitatibus vero suscipit
          dicta odit doloremque cupiditate. Ab ducimus facere consectetur
          facilis in distinctio, minus possimus assumenda sunt omnis molestias
          cumque veritatis fuga ipsum. Quibusdam placeat aut, nostrum, harum
          totam eligendi quasi quod quidem non inventore excepturi. Temporibus
          voluptates aperiam nihil inventore ipsa, molestiae repellat quas illum
          voluptatibus culpa sapiente enim expedita numquam error a recusandae
          fugit. Suscipit velit et odio? Cumque repellendus maxime atque iure
          numquam! Rem, fugit quasi maxime nam reiciendis beatae nemo numquam
          ullam. Nisi quasi eum praesentium corporis dolor accusamus, ullam, in
          commodi eligendi sed incidunt natus quas pariatur veritatis, sunt
          nihil vel. Ut, eligendi. Quo tempore amet similique odit aliquid
          adipisci nam laboriosam nihil atque reiciendis? Facere, officiis.
          Quisquam, porro, exercitationem nobis vitae quam voluptas maiores quae
          blanditiis ratione maxime quasi provident. Eius culpa officiis, qui
          molestiae voluptatibus tempora in consequatur. Debitis eligendi ipsum
          ab culpa dolorem laudantium est totam corporis iure nobis? Alias a
          porro in id fugiat recusandae, consectetur nemo. Sint earum adipisci
          consectetur aliquid mollitia accusamus repellendus ipsa dicta? Iste
          ducimus minima totam aliquam illo quibusdam omnis repellat! Esse modi
          earum nam magni maiores itaque, illo dolores minus. Neque? Sed hic
          laudantium expedita saepe fuga sequi ratione consequuntur nam,
          obcaecati ducimus quibusdam, quaerat distinctio dolorem rem?
          Laudantium magni sed id eveniet. Deleniti doloremque aperiam impedit
          at asperiores. Error, sint? Harum tempore a quis quibusdam provident
          hic pariatur maiores reprehenderit numquam neque! Consectetur
          voluptate voluptatum mollitia repellat reprehenderit officia veritatis
          sunt blanditiis ratione. Veritatis reiciendis accusantium impedit
          error ad recusandae. Atque laborum voluptas et non dolorum magnam.
          Sunt soluta autem explicabo iure ducimus odio voluptatem culpa. Velit
          id non perspiciatis, quaerat, libero nulla, sint maiores iusto ipsa
          veritatis vero esse. Magnam eaque, fugit deserunt ipsam reprehenderit
          commodi incidunt blanditiis quaerat dignissimos officia numquam
          doloribus iure voluptas! Autem deserunt quae molestias laborum, quasi
          nesciunt tempore aut dicta nulla sit quia voluptate? Pariatur animi
          incidunt laboriosam ipsa libero ducimus assumenda necessitatibus, quis
          expedita culpa minus. Voluptas quidem soluta, totam fugiat doloribus
          deleniti explicabo laboriosam voluptates eum blanditiis? Delectus
          excepturi rerum voluptates fugit. Quo numquam hic ea adipisci, fugiat
          quidem eligendi. Consequuntur ad fugit excepturi repellendus quo error
          ipsam tenetur, voluptatem unde soluta recusandae! Illo quibusdam
          exercitationem rem repellat eveniet repellendus incidunt quaerat.
          Omnis ducimus ea enim esse in veritatis exercitationem asperiores
          eligendi possimus officiis molestiae eos minus illo, nulla, non
          voluptate magni porro dolorum quis excepturi eveniet numquam molestias
          facilis distinctio. In. Atque, ipsum sed ipsa exercitationem tempora
          tenetur quis dolorem voluptates pariatur quibusdam, alias deleniti
          rerum suscipit quia facilis optio quas culpa totam in harum quam
          asperiores necessitatibus ut nisi. Cupiditate. Harum, molestias?
          Excepturi obcaecati, magnam corrupti possimus ut similique fuga
          doloribus rerum. Veniam explicabo vero corporis minima id maxime,
          molestias rerum ea aut dolore perferendis non unde a, nisi molestiae.
          Recusandae corporis ullam aspernatur vel cumque eius ut possimus quia
          est temporibus beatae, dolore, iure inventore consequuntur impedit
          consectetur assumenda accusamus magni expedita fugit repellendus eos
          repudiandae? Saepe, fugiat repellat? Ea ex, sunt doloremque illum
          autem harum at. Quibusdam minima pariatur quam veritatis dolorum,
          molestiae nihil id maiores neque? Animi nobis ut itaque, temporibus
          obcaecati minima odit quidem quam suscipit.
        </TabsContent>

        <TabsContent value='image' className='w-full max-w-full text-sm'>
          <div className='w-full'></div>
        </TabsContent>

        {user.username === currentUser?.username && (
          <TabsContent value='saved' className='text-sm'>
            Saved
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
