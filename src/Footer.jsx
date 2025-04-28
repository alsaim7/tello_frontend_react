export function Footer(){
    return(
        <footer className="bg-gray-900 border-t border-t-gray-500 text-white">
            <div className="container pt-1 pr-0 pb-5 pl-0 mx-auto">
                <div style={{ width: '100%' }} className="flex justify-center">
                    <img src="https://res.cloudinary.com/dnkqy2kkr/image/upload/v1745074098/logo-transparent_ut9qt7.png" alt="dark" style={{ width: '100px' }} />
                </div>
                

                <ul className="flex justify-center gap-6 mb-6 text-gray-300 font-bold">
                    <li>
                        <a href="https://alsaim.pages.dev" className="hover:text-white" target="_blank" rel="noopener noreferrer">About Me</a>
                    </li>
                    <li>
                        <a href="https://github.com/alsaim7" className="hover:text-white" target="_blank" rel="noopener noreferrer">GitHub</a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/alsaimshakeel7" className="hover:text-white" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </li>
                </ul>


                <span className="text-center block font-normal text-sm">&#169; 2025 MyTello</span>
            </div>
        </footer>
    )
}