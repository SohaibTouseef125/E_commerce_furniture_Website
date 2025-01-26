export const query = `*[_type == "product"]{
    _id,
    title,
    "imageUrl": image.asset->url,
    price,
    tags,
    description,
    dicountPercentage,
    isNew,  
}`