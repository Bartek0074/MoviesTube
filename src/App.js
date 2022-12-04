import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
	Navbar,
	Feed,
	VideoDetail,
	ChannelDetail,
	SearchFeed,
} from './components/index.js';

function App() {
	return (
		<div className='wrapper'>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path='/' exact element={<Feed />} />
					<Route path='/video/:id' element={<VideoDetail />} />
					<Route path='/channel/:id' element={<ChannelDetail />} />
					<Route path='/search/:searchTerm' element={<SearchFeed />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
