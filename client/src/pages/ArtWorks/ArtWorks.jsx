import React, { useState } from 'react';
import "./artWorks.scss"

function Artworks() {
  const [currentDecade, setCurrentDecade] = useState(1500);
  const [artworks, setArtworks] = useState([
    {
      id: 1,
      name: "'Mona Lisa' by Leonardo da Vinci",
      description:
        " This famous portrait depicts a woman with a serene expression and enigmatic smile. Painted in oil on a panel between 1503 and 1506, it is considered one of the most recognizable and valuable paintings in the world.",
      year: 1503,
      imageUrl:
        "https://images.unsplash.com/photo-1607857531075-d81f84c465d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      id: 2,
      name: "The Starry Night",
      description:
        "The Starry Night is an oil painting by the Dutch post-impressionist painter Vincent van Gogh.",
      year: 1889,
      imageUrl:
        "https://cdn.kastatic.org/ka-perseus-images/b6e662b4efcd6c53bf80c73259d46c20c0bd2961.jpg",
    },
    {
      id: 3,
      name: "'The Last Supper' by Leonardo da Vinci ",
      description:
        "This mural painting, also by Leonardo da Vinci, depicts Jesus Christ and his disciples at the moment when he announces that one of them will betray him. Painted in Milan, Italy between 1495 and 1498, it is considered one of the most famous works of art in the world.",
      year: 1500,
      imageUrl:
        "https://www.italian-renaissance-art.com/images/LeonardoLastSupper.jpg",
    },
    {
      id: 4,
      name: "'The School of Athens' by Raphael ",
      description:
        "This fresco painting depicts the great thinkers of ancient Greece and Rome gathered together in a grand hall. Completed in 1511, it is considered one of the most famous works of art from the High Renaissance period.",
      year: 1511,
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/School-of-athens2.jpg/1024px-School-of-athens2.jpg",
    },
    {
      id: 5,
      name: "'The Hay Wagon' by John Constable",
      description:
        "This painting depicts a rural scene with a hay wagon and farmers working in the fields. Completed in 1821, it is considered one of the most iconic works of English landscape painting.",
      year: 1821,
      imageUrl:
        "https://static.independent.co.uk/2022/07/04/21/SEI113008555.jpeg",
    },
    {
      id: 6,
      name: "'Liberty Leading the People'by Eugène Delacroix",
      description:
        "This painting depicts the allegorical figure of Liberty leading the people of France during the July Revolution of 1830. Completed in 1831, it is considered one of the most iconic and important works of French Romanticism.",
      year: 1830,
      imageUrl:
        "https://smarthistory.org/wp-content/uploads/2015/11/dellibselfiesm.jpg",
    },
    {
      id: 7,
      name: "'The Raft of the Medusa' by Théodore Géricault",
      description:
        "This painting depicts the aftermath of a shipwreck where the survivors were left to drift on a makeshift raft for weeks. Completed in 1819, it is considered one of the most powerful and dramatic works of French Romanticism.",
      year: 1819,
      imageUrl:
        "https://pyxis.nymag.com/v1/imgs/81c/a14/9e3a583f667547823ded31953790cb08e0-raft-of-the-medusa.jpg",
    },
    {
      id: 8,
      name: "'Les Demoiselles d'Avignon' by Pablo Picasso",
      description:
        "This painting depicts five nude prostitutes in a brothel, with distorted and angular shapes. Completed in 1907, it is considered one of the most iconic and influential works of Cubism.",
      year: 1907,
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1395/5787/articles/picasso_lead.jpg?v=1632350279",
    },
    {
      id: 9,
      name: "'The Fountain' by Marcel Duchamp ",
      description:
        "This artwork consists of a porcelain urinal that Duchamp signed with a pseudonym and presented as a readymade art object. Completed in 1917, it is considered one of the most controversial and provocative works of Dadaism.",
      year: 1917,
      imageUrl:
        "https://d7hftxdivxxvm.cloudfront.net/?height=630&quality=80&resize_to=fill&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2FHewgj2FZj1q5vvfAyJCsmg%252FThumb1.jpg&width=1200",
    },
    {
      id: 10,
      name: "'The Physical Impossibility of Death in the Mind of Someone Living' by Damien Hirst",
      description:
        "This artwork consists of a preserved shark suspended in a tank of formaldehyde. Completed in 1991, it is considered one of the most controversial and provocative works of contemporary art.",
      year: 1991,
      imageUrl:
        "https://www.thenationalnews.com/resizer/KSfdZU1UL6V8G0buyT7m5T1L1N4=/arc-photo-thenational/eu-central-1-prod/public/H6TQPILY6SMNHQQRJ2XEINPKJY.jpg",
    },
  ]);

   const filteredArtworks = artworks.filter((artwork) => {
    const artworkDecade = Math.floor(artwork.year / 100) * 100;
    return artworkDecade === currentDecade;
  });

  function handleDecadeChange(decade) {
    setCurrentDecade(decade);
  }

   return (
     <div className="artworks">
       <div className="header">
         <h1>Art Works throughout History.</h1>
         <span>
           "A curated collection of some of the most iconic and influential
           artworks from different centuries and cultures around the world. From
           ancient cave paintings to contemporary sculptures, this section aims
           to provide users with a rich and diverse visual experience that
           celebrates the beauty and power of human creativity across time and
           space"
         </span>
       </div>
       <div className="buttons-container">
        <span>Pick your Century!</span>
         <button onClick={() => handleDecadeChange(1500)}>1500s</button>
         <button onClick={() => handleDecadeChange(1800)}>1800s</button>
         <button onClick={() => handleDecadeChange(1900)}>1900s</button>
       </div>
       <div className="artworks-list">
         {filteredArtworks.map((artwork) => (
           <div className="artwork" key={artwork.id}>
             <img
               className="artwork-image"
               src={artwork.imageUrl}
               alt={artwork.name}
             />
             <h2 className="artwork-name">{artwork.name}</h2>
             <p className="artwork-description">{artwork.description}</p>
           </div>
         ))}
       </div>
     </div>
   );
}


export default Artworks;
