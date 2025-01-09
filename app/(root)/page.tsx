import { STARTUPS_QUERY } from "@/lib/queries";
import SearchForm from "../../components/SearchForm";
import StartUpCard, { StartUpTypeCard } from "@/components/StartUpCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { writeClient } from "@/sanity/lib/write-clients";
import { auth } from "../api/auth/auth";

export default async function Home({searchParams}:{
    searchParams: Promise<{query?:string}>
}) {
    const query = (await searchParams).query;
    const params = {
        search:query || null
    };
    const session = await auth()
    console.log(session?.id);
    const {data:posts} = await sanityFetch({query: STARTUPS_QUERY, params});


    //console.log(JSON.stringify(posts[0], null, 2));
    /*const posts = [{
        _createdAt: new Date(),
        views: 55,
        author: {_id: 1, name:'Manan'},
        _id: 1,
        description: "This is a description",
        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.robot-magazine.fr%2Fwe-robot-revelation-du-tesla-robotaxi%2F&psig=AOvVaw2Z5SXvrWyjMea7_8V-KawL&ust=1735655215814000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCODLk9jZz4oDFQAAAAAdAAAAABAE",
        category: "Robots",
        title: "We Robots",
    }]*/

    return (
        <>
            <section className="pink_container">
                <h1 className="heading">Pitch your startup, <br/> Conect with entrepreneurs</h1>
                <p className="sub-heading !max-w-3xl"> Submit ideas, Vote on Pitches and get noticed in virtual competitions</p>

                <SearchForm query={query} />

            </section>

            <section className="section_container">
                <p className="text-30-semibold">
                    {query ? `Search results for "${query}"`: 'All startups'}
                </p>

                <ul className="mt-7 card_grid">
                    {posts?.length >0 ?(
                        posts.map((post:StartUpTypeCard, number) =>(
                            <StartUpCard key={post.id} post={post}/>
                        ))
                    ) : (
                        <p className="no-results"> No startup found </p>
                    )
                    }
                </ul>
            </section>
            
            <SanityLive />
            
        </>
    );
}
