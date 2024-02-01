import { render, screen } from '@testing-library/react';
import Home from '../src/app/page';

it('should have text',()=>{
    render(<Home/>)
    const text = screen.getByText(/aaa/i)
    expect(text).toBeInTheDocument()
})