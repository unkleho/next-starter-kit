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

export function debounce(callback, wait, context = this) {
  let timeout = null;
  let callbackArgs = null;

  const later = () => callback.apply(context, callbackArgs);

  return (...args) => {
    callbackArgs = args;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function throttle(callback, wait, context = this) {
  console.log('throttle');

  let timeout = null;
  let callbackArgs = null;

  const later = () => {
    console.log('later');
    callback.apply(context, callbackArgs);
    timeout = null;
  };

  return (...args) => {
    console.log('return');
    if (!timeout) {
      callbackArgs = args;
      timeout = setTimeout(later, wait);
    }
  };
}
