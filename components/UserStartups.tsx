import StartUpTypeCard from '@/app/(root)/startup/[id]/page'
import { STARTUPS_BY_AUTHOR_QUERY } from '@/lib/queries'
import { client } from '@/sanity/lib/client'
import React from 'react'
import StartUpCard from './StartUpCard'

const UserStartups = async ({id}: {id:string}) => {
    const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, {id})
    return (
        <>
          {startups.length > 0 ? (
            startups.map((startup: StartUpTypeCard) => (
              <StartUpCard key={startup._id} post={startup} />
            ))
          ) : (
            <p className="no-result">No posts yet</p>
          )}
        </>
      );

    }

export default UserStartups