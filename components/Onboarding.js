import { Image } from 'react-native';
import React from 'react';
import { Mutation } from "react-apollo";
import { ONBOARD } from "../queries.js";

import Onboarding from 'react-native-onboarding-swiper';

const Onboard = (props) => (
    <Mutation mutation={ONBOARD}>
        {onBoard => (
            <Onboarding
                pages={[


                    {
                        backgroundColor: '#fff',
                        image: <Image source={require('../assets/images/strength.png')} style={{ width: 165, height: 165, marginTop: 20 }} />,
                        title: 'Venture Guts',
                        subtitle: `The Guts to test your ideas.`,
                    },

                    {
                        backgroundColor: '#fff',
                        image: <Image source={require('../assets/images/target.png')} style={{ width: 100, height: 100 }} />,
                        title: 'List a Startup Goal',
                        subtitle: `Describe the next big goal for your startup.`,
                    },

                    {
                        backgroundColor: '#fff',
                        image: <Image source={require('../assets/images/goal.png')} style={{ width: 100, height: 100 }} />,
                        title: 'Work with our Tools.',
                        subtitle: `Use Startup Problem and Customer Interview threads to get closer to your goal.`,
                    },


                    // {
                    //     backgroundColor: '#fff',
                    //     image: <Image source={require('../assets/images/bar-chart.png')} style={{ width: 210, height: 210 }} />,
                    //     title: 'Enter The Real World',
                    //     subtitle: `Learn from your customer interviews and community feedback.`,
                    // },



                ]}

                onDone={() => {
                    onBoard();
                    props.refetch();
                }
                }

                showSkip={false}
            />
        )}

    </Mutation>
);

export default Onboard;