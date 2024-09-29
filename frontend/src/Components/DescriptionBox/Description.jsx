import React, { useState } from 'react'
import './Description.css'

const Description = () => {

    const [desc, setDesc] = useState('Product Detail');

  return (
    <div className='container'>
        <div className='description-box'>
            <div className="description-tab">
                <ul>
                    <li onClick={()=>setDesc('Product Detail')}>Product Detail</li>
                    <li onClick={()=>setDesc('Reviews (3069)')}>Reviews (3069)</li>
                    <li onClick={()=>setDesc('Feedback')}>Feedback</li>
                </ul>
            {desc === 'Product Detail' && (
                <div className="description-content open">
                    <h3>Product Detail</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ornare nibh in augue sollicitudin, non placerat ex dignissim. Mauris velit ipsum, porta ut tempus eget, ornare eget arcu. Cras leo arcu, varius nec leo vel, tristique consectetur lorem.</p>
                    <p>Etiam cursus felis posuere libero bibendum, id malesuada tortor condimentum. Quisque sit amet metus vel quam facilisis laoreet at fermentum felis. Integer feugiat ligula massa, et sagittis lectus mattis tristique. Proin varius, nisi quis elementum auctor, neque massa lobortis tellus, nec lacinia leo velit et ante. Phasellus et lobortis nibh. Morbi dapibus eu nunc vel fringilla. Pellentesque elementum lacinia nisi, vel vestibulum massa bibendum ut. Curabitur pretium tortor mauris, in tincidunt risus facilisis et. In hendrerit nisi lorem, at ultricies ligula commodo sit amet. Nullam rhoncus mauris eu ante malesuada, ac accumsan massa ornare. Nulla vehicula non nunc nec volutpat. Morbi sollicitudin nibh quis tortor euismod vehicula. Vivamus mollis, neque ultrices vulputate feugiat, quam ex sagittis ligula, id tempus odio orci eu nunc.</p>
                </div>
            )}
            {desc === 'Reviews (3069)' && (
                <div className="description-content open">
                    <h3>Reviews (3069)</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ornare nibh in augue sollicitudin, non placerat ex dignissim. Mauris velit ipsum, porta ut tempus eget, ornare eget arcu. Cras leo arcu, varius nec leo vel, tristique consectetur lorem.</p>
                    <p>Etiam cursus felis posuere libero bibendum, id malesuada tortor condimentum. Quisque sit amet metus vel quam facilisis laoreet at fermentum felis. Integer feugiat ligula massa, et sagittis lectus mattis tristique. Proin varius, nisi quis elementum auctor, neque massa lobortis tellus, nec lacinia leo velit et ante. Phasellus et lobortis nibh. Morbi dapibus eu nunc vel fringilla. Pellentesque elementum lacinia nisi, vel vestibulum massa bibendum ut. Curabitur pretium tortor mauris, in tincidunt risus facilisis et. In hendrerit nisi lorem, at ultricies ligula commodo sit amet. Nullam rhoncus mauris eu ante malesuada, ac accumsan massa ornare. Nulla vehicula non nunc nec volutpat. Morbi sollicitudin nibh quis tortor euismod vehicula. Vivamus mollis, neque ultrices vulputate feugiat, quam ex sagittis ligula, id tempus odio orci eu nunc.</p>
                </div>
            )}
            {desc === 'Feedback' && (
                <div className="description-content open">
                    <h3>Feedback</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ornare nibh in augue sollicitudin, non placerat ex dignissim. Mauris velit ipsum, porta ut tempus eget, ornare eget arcu. Cras leo arcu, varius nec leo vel, tristique consectetur lorem.</p>
                </div>
            )}
        </div>
    </div>
    </div>
  )
}

export default Description
