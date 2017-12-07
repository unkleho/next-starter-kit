export const formatDate = (date) => {
  const d = new Date(date);
  return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
};

export const mapPostToTile = (post) => {
  return {
    title: post.title,
    date: formatDate(post.date),
    content: post.excerpt,
    slug: post.slug,
    imageUrl: post.featuredMedia && post.featuredMedia.sizes.full.sourceUrl,
    imageAltText: post.featuredMedia && post.featuredMedia.sizes.full.altText,
  };
};

export function throttle() {
  console.log('throttle');

  // let timeout = null;
  // let callbackArgs = null;

  // const later = () => {
  //   console.log('later');
  //   callback.apply(context);
  //   // timeout = null;
  // };

  // return (...args) => {
  //   console.log('return');
  //   if (!timeout) {
  //     callbackArgs = args;
  //     timeout = setTimeout(later, wait);
  //   }
  // };
}
