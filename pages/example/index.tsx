import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import App from '../../components/App';

import variables from '../../styles/variables.scss';
import css from './index.scss';

type Props = {
	id?: string;
};

const ExamplePage: React.FunctionComponent<Props> = ({ id }) => {
	const router = useRouter();

	const sizes = ['xxs', 'xs', 'sm', 'md', 'lg', 'xlg', 'xxlg', 'xxxlg'];
	const colours = ['primary', 'secondary', 'highlight', 'grey'];
	const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

	return (
		<App
			title="Example Page"
			description="Lomo cardigan keffiyeh fingerstache vape portland actually PBR&B knausgaard art party four dollar toast."
			className={css.examplePage}
		>
			<h1 className={css.title} data-testid="title">
				Example Page <span>{id}</span>
			</h1>

			<section>
				{id === '1' ? (
					<Link href="/example" as="/example">
						<a>Example Page Link</a>
					</Link>
				) : (
					<Link href="/example/[id]" as="/example/1">
						<a>Example Page 1 Link</a>
					</Link>
				)}

				<p>
					Lomo cardigan keffiyeh fingerstache vape portland actually PBR&B
					knausgaard art party four dollar toast. Af chia air plant marfa, craft
					beer kale chips lyft bespoke biodiesel cliche fanny pack mixtape
					kombucha cred jean shorts.
				</p>
				<p>
					Subway tile drinking vinegar copper mug, mustache typewriter tbh
					leggings meggings distillery selfies 8-bit church-key flannel.
					Meggings mumblecore selfies keytar cornhole craft beer vice pork belly
					artisan, forage ethical helvetica. Succulents single-origin coffee
					cronut forage banh mi shaman tumblr fingerstache heirloom kogi four
					dollar toast migas. Pour-over 90's synth kogi yuccie.
				</p>
				<p>
					Offal tbh wolf before they sold out, 3 wolf moon master cleanse
					freegan leggings jean shorts humblebrag palo santo swag succulents
					banjo.
				</p>

				<p>Pathname: {router.pathname}</p>
			</section>

			<h2>Style Guide</h2>
			<section>
				<h3>Type Scale</h3>
				{sizes.map((size) => (
					<p
						style={{
							fontSize: variables[`font-size-${size}`],
						}}
						key={`font-size-${size}`}
					>{`font-size-${size}`}</p>
				))}
			</section>

			<section>
				<h3>Colours</h3>
				{colours.map((colour) => (
					<div key={colour}>
						<h4>{colour}</h4>

						{colour === 'grey' ? (
							<>
								{[...Array(10)].map((_, i) => {
									return (
										<div className={css.colourHolder} key={i}>
											<div
												className={css.colourBox}
												key={`box--colour-${colour}-${i}`}
												style={{
													backgroundColor:
														variables[`colour-${colour}-${shades[i]}`],
												}}
											></div>
											<p>
												$colour-{colour}-{shades[i]}
											</p>
										</div>
									);
								})}
							</>
						) : (
							<div className={css.colourHolder}>
								<div
									className={css.colourBox}
									style={{
										backgroundColor: variables[`colour-${colour}`],
									}}
								></div>
								<p>$colour-{colour}</p>
							</div>
						)}
					</div>
				))}
			</section>

			<section>
				<h2>Dotenv Test</h2>
				<p data-testid="dotenv">{process.env.TEST}</p>

				{/* <h2>GraphQL Test</h2>
					<p>{process.env.GRAPHQL_URL}</p>
					<ul data-testid="graphql-objects">
						{objects &&
							objects.map(({ displayTitle }, i) => {
								return <li key={i}>{displayTitle}</li>;
							})}
					</ul> */}
			</section>
		</App>
	);
};

export default ExamplePage;
