import React from 'react';

const StoriesList = ({ Stories, deleteStory, updateFavorite }) => {
    return(
        Stories.map(story => {
            return(
                <section>
                    <div>
                        <li key={ story.id }>
                            { story.title } {story.isTrue}<br/>
                            <button onClick={()=> updateFavorite(story)}>Add Favorite</button>
                            <button onClick={ ()=> deleteStory(story) }>x</button>
                            <p>
                                { story.body }
                            </p>
                        </li>
                    </div>
                </section>
            )
        })
    )
};

export default StoriesList;

{/* <li className={ user.id === userId*1 ? 'selected': ''} key={ user.id }>
                <a href={`#${user.id}`}>
                { user.name }<br/>
                <button onClick={()=> userDeleted(user)}>x</button>
                </a>
              </li>

<li key={ story.id }>
{ story.title }<br/>
<button>Favorite</button>
<button onClick={ ()=> deleteStory(story) }>x</button>
<p>
    { story.body }
</p>
</li> */}