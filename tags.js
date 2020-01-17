const tags = [

    {
        name: '#Problem Statement',
        type: 1
    },

    {
        name: '#Product Discipline',
        type: 2
    },

    {
        name: 'Funding Strategy',
        type: 3
    },

    {
        name: '#Smart Growth',
        type: 4
    },




]


const categories = [
    {
        name: 'FundaMental',
        type: 1
    },
    {
        name: 'Customer Interview',
        type: 2
    },
    {
        name: 'Great Article',
        type: 3
    },
]


const phases = [
    {
        name: 'EXPERIMENT SETUP',
        type: 1
    },
    {
        name: 'EXPERIMENT IN PROGRESS',
        type: 2
    },
    {
        name: 'COMPLETED',
        type: 3
    },
]


const experiment_types = [
    {
        name: 'Wizard of Oz',
        type: 1,
        icon: '🧙‍',
        body: `The Wizard of Oz method is a process that allows a user to interact with an interface without knowing that the responses are being generated by a human rather than a computer by having someone behind-the-scenes who is pulling the levers and flipping the switches. As UX researchers we often remind people to test systems at every stage of development, and that includes testing before development has even begun. This can save time, money and those ever so embarrassing moments when products are launched before they are fit and ready for users. \n \nThe Wizard of Oz methodology allows you to test users’ reactions to a system before you even have to think about development. This could be a new concept you are unsure will work for your users or a project that would require a substantial amount of effort to create, but we want to learn more before it makes sense to invest the time and money, and it cannot be tested with the usual prototype tools. Wizard of Oz is a flexible approach that allows concepts to be tested and modified without having to worry about potentially tiresome code changes, breaks in a daily testing schedule or full development costs. \n \nPrototype, prototype, prototype! The easiest way to conduct Wizard of Oz testing is to build a simple and easy-to-use prototype that allows the ‘Wizard’ to quickly react to the user’s gestures or actions with the designed response with a single click. \n \nSimilar to any methodology, creating a Wizard-of-Oz prototype starts with us having to determine what we want to test or explore. Then we need to figure out how to fake the functionality needed to give the user a realistic experience from their viewpoint. For example, you could prototype a jukebox without creating the mechanics and use a hidden person to play the selected songs to the customer.`
    },
    {
        name: 'Concierge Test',
        type: 2,
        icon: '📞',
        body: `Concierge testing is an interview-based method for validating solutions with potential customers by asking them, in their native environment like a cafe or grocery store, whether or not they would be interested in paying for a hypothetical product or service. By engaging with the participant in the right environment and through directed questioning or guided show-and-tell, the team is capable of truly gauging prospective success with someone in the right frame of mind to similarly use the product after launch. \n \nConcierge testing produces validation or invalidation of a solution, based on verbal or emotional responses from participants.`
    },
    {
        name: 'Single Feature Product',
        type: 3,
        icon: '📱',
        body: `How: Build a product that only solves one specific problem that your customers are having Ð typically a tool with one single feature. \n \nWhy: Building just a single feature is a powerful way to start, as you are focused on solving one very specific problem for a very specific niche group better than anyone else. Chances are your early adopters will give you valuable insight into how your product should eventually evolve into a platform.`
    },
    {
        name: 'Customer Interview',
        type: 4,
        icon: '👨 👩‍🎨',
        body: `Customer interviews are a common mechanism for gathering the voice of the customer (VOC). Customer interviews are usually conducted one-on-one with an individual customer or with a small number of people from the same business or family unit. They provide an opportunity to get in-depth information from a single customer.`
    },
    {
        name: 'Low Fidelity Prototype',
        type: 5,
        icon: '📋',
        body: `Design fidelity refers to the level of detail and functionality included in a prototype. Fidelity can vary in interactivity, visuals, content and commands, and other areas. When you’re getting ready to begin prototyping, you’ll need to decide how closely you want it to match the end result, which will also dictate how much time and energy you need to put into it. \n \nLow-fidelity prototypes, for example, are simple and low-tech concepts. All you need to get started is a pen and paper. \n \nThe goal is to turn your ideas into testable artifacts that you can then use to collect and analyze feedback in the early stages.`
    },
    {
        name: 'Sell Before You Build',
        type: 6,
        icon: '💵',
        body: `The best way to sell a product online is to first test your market to see if people actually want to buy it. You do this by not creating the product first… but by selling it first. There’s no point in spending time, energy, and resources on building something that may be a flop.`
    },
    {
        name: 'Custom Experiment',
        type: 7,
        icon: '🖊️',
        body: `Custom experiment type that is not yet a designated experiment type.`
    },
]





export { tags, categories, phases, experiment_types } 