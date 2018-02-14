export const buildHeadTitle = (title) => {
  return `${title ? `${title} | ` : ''}DX Lab - State Library of NSW`;
};

export const formatDate = (date) => {
  const d = new Date(date);
  return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
};

// TODO: Use on homepage
export const mapPostToTile = (post) => {
  return {
    title: post.title,
    date: formatDate(post.date),
    content: post.excerpt,
    slug: post.slug,
    tallImageUrl:
      post.featuredMedia &&
      post.featuredMedia.sizes.tallTile &&
      post.featuredMedia.sizes.tallTile.sourceUrl,
    mediumImageUrl:
      post.featuredMedia &&
      post.featuredMedia.sizes.mediumTile &&
      post.featuredMedia.sizes.mediumTile.sourceUrl,
    smallImageUrl:
      post.featuredMedia &&
      post.featuredMedia.sizes.smallTile &&
      post.featuredMedia.sizes.smallTile.sourceUrl,
    imageAltText: post.featuredMedia && post.featuredMedia.altText,
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

export function swapArrayElements(a, x, y) {
  if (a.length === 1) return a;
  a.splice(y, 1, a.splice(x, 1, a[y])[0]);
  return a;
}
