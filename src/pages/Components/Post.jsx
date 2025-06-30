import { useInView } from 'react-intersection-observer'

function Post({content, key}) {

    const { ref, inView } = useInView()

  return (
    <div className="wrapper" ref={ref} >
    {inView && (
        <div key={key}  >
        <div className="content">
            <p>
                {content}
            </p>
        </div>
        <div className="buttons">
            <div><button>like</button></div>
            <div><button>comment</button></div>
            <div><button>share</button></div>
        </div>
    </div>)}
    </div>
  )
}

export default Post