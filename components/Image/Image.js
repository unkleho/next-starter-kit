import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';

import styles from './Image.css';

// TODO: Lots to fix up here, imported from another project

class Image extends Component {

  static propTypes = {
    className: PropTypes.string,
    src: PropTypes.string,
    alt: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    aspectRatio: PropTypes.number, // Width / Height
    srcSet: PropTypes.string,
    sizes: PropTypes.string,
    showLoader: PropTypes.bool,
    // sources: PropTypes.array(PropTypes.shape({
    //   media: PropTypes.string,
    //   srcSet: PropTypes.string,
    // })),
    noImageContent: PropTypes.object || PropTypes.string,
    loadingContent: PropTypes.object || PropTypes.string,
    onClick: PropTypes.func,
    isHandleImageError: PropTypes.bool,
  };

  static defaultProps = {
    showLoader: false,
    noImageContent: <i className="fa fa-picture-o" />,
    loadingContent: <i className="fa fa-circle-o-notch fa-spin" />,
    isHandleImageError: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      isImageError: !this.props.src,
    };
  }

  componentDidMount() {
		// Client side script may load after image loads, therefore it won't trigger
		// handleImageLoad, so we gotta add a check here.
		// http://stackoverflow.com/questions/39777833/image-onload-event-in-isomorphic-react-register-event-after-image-is-loaded
    if (this.node.complete) {
      this.handleImageLoad();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src) {
      this.setState({ isLoaded: false });
    }
  }

  handleImageLoad = () => {
		// TODO: Chrome doesn't seem to update this onLoad.
    this.setState({ isLoaded: true });
  };

  handleImageError = () => {
    // event.target.src = '';
    this.setState({ isImageError: true });
  };

  render() {
    const imageStyle = {
      paddingTop: this.props.aspectRatio && `${100 / this.props.aspectRatio}%`,
      ...this.props.style,
    };

    // const pictureSource =
		// 	this.props.sources &&
		// 	this.props.sources.map((source, i) => {
    //     return (
		// 			<source
		// 				key={`pictureSource-${i}`}
		// 				media={source.media}
		// 				srcSet={source.srcSet}
		// 			/>
    //     );
    //   });

    const image = (
      <img
				src={this.props.src}
				alt={this.props.alt}
				onClick={this.props.onClick}
				onLoad={this.handleImageLoad}
				onError={this.props.isHandleImageError && this.handleImageError}
				width={this.props.width}
				height={this.props.height}
				srcSet={this.props.srcSet}
				sizes={this.props.sizes}
				ref={node => (this.node = node)}
			/>
		);

    return (
			<div
        // className={classNames("dxlab-image", this.props.className, {} // 	"is-loaded": this.state.isLoaded,
        //   "is-loading": !this.state.isLoaded,
        // 	 "is-image-error": this.state.isImageError,
        // 	 "has-aspect-ratio": this.props.aspectRatio,
        // })}
        className={`image
          ${this.props.className ? this.props.className : ''}
          ${this.state.isLoaded ? 'is-loaded' : 'is-loading'}
        `}
				style={imageStyle}
			>
				{/* {pictureSource ? (
					<picture>
						{pictureSource}
						{image}
					</picture>
				) : (
					image
				)} */}

        {image}

				{this.state.isImageError && (
					<div className="dxlab-image__status">{this.props.noImageContent}</div>
				)}
				{this.props.showLoader &&
				!this.state.isLoaded &&
				!this.state.isImageError && (
					<div className="dxlab-image__status">{this.props.loadingContent}</div>
				)}

        <style global jsx>{styles}</style>
			</div>
    );
  }

}

export default Image;
