import react from 'react';
import  {shallow, mount} from 'enzyme';


import { findByTestAttr} from '../test/testUtils';

import Congrats from './Congrats';
import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext'






/**
 * Factory function to create a shallowWrapper for the GuessWords Components
 * @function setup
 * @param {object} props - Component props specific to this setup.
 *@return {ShallowWrapper}
 */


const setup = ({success, language}) => {
    language = language || 'en';
    success = success || false;

    return mount(
        <languageContext.Provider value={language}>
            <successContext.SuccessProvider value={[success, jest.fn()]}>
            <Congrats />
            </successContext.SuccessProvider>
           
        </languageContext.Provider>
    );

}

describe('languagePicker', () => {
   test('correctly render congrats string in english', () => {
       const wrapper= setup({success: true});
       expect(wrapper.text()).toBe("Congratulations! You guessed the word!")
   })
   test('correctly renders congrats string in emoji' ,()=> {
        const wrapper = setup({success: true, language: 'emoji'});
        expect(wrapper.text()).toBe('🎯🎉')

   })

})


test('renders without error', () => {
    const wrapper = setup({});
    const component = findByTestAttr(wrapper, 'component-congrats');
    expect(component.length).toBe(1);
});

test('renders no text when `success` prop is false', ()=>{
    const wrapper = setup({success: false});
    const component = findByTestAttr(wrapper, 'component-congrats');
    expect(component.text()).toBe('');
});

test('render non-empty congrats message when `success` props is true', () => {
    const wrapper = setup({success: true});
    const message = findByTestAttr(wrapper, 'congrats-message');
    expect(message.text().length).not.toBe(0);
});   
