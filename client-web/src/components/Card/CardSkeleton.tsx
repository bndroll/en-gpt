import ContentLoader from 'react-content-loader';

export const CardSkeleton = () => {
	return (
		<ContentLoader speed={2}
									 width={570}
									 height={320}
									 viewBox="0 0 570 320"
									 backgroundColor="#f3f3f3"
									 foregroundColor="#ecebeb">
			<rect x="0" y="0" rx="5" ry="5" width="120" height="30"/>
			<rect x="0" y="40" rx="5" ry="5" width="75" height="15"/>

			<rect x="0" y="70" rx="5" ry="5" width="90" height="20"/>
			<rect x="0" y="95" rx="5" ry="5" width="150" height="12"/>
			<rect x="0" y="110" rx="5" ry="5" width="170" height="12"/>
			<rect x="0" y="125" rx="5" ry="5" width="120" height="12"/>

			<rect x="0" y="155" rx="5" ry="5" width="120" height="20"/>
			<rect x="0" y="180" rx="5" ry="5" width="170" height="12"/>

			<rect x="0" y="210" rx="5" ry="5" width="90" height="20"/>
			<rect x="0" y="235" rx="5" ry="5" width="170" height="12"/>
			<rect x="0" y="250" rx="5" ry="5" width="120" height="12"/>

			<rect x="0" y="280" rx="5" ry="5" width="90" height="20"/>
			<rect x="0" y="305" rx="5" ry="5" width="170" height="12"/>
		</ContentLoader>
	)
}