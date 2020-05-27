import React, { Fragment, Component } from 'react'
import axios from 'axios';


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            msg: {}
        }
    }

    async componentDidMount() {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.get('/data', config);
            this.setState({ data: res.data })
        } catch (error) {
            if (error) {
                // this.setState({ msg: error.response.data.msg })
            }
        }
    }

    render() {
        const data = this.state.data;

        return (
            <Fragment>
                <div className="container my-5">
                    {data.length ? data.map((item, index) =>
                        <div className="card" key={index}>
                            <div className="card-header">
                                <span>{index + 1}</span> &nbsp; &nbsp;
                                <span>{item.firstname}</span>&nbsp; &nbsp;
                                <span>
                                    {item.date}
                                </span>&nbsp; &nbsp;
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-4">
                                        <img src={`/images/${item.image}`} alt="" width="100%" height="100%" />
                                    </div>
                                    <div className="col-md-4">
                                        <img src={`/images/${item.sig}`} alt="" width="100%" height="100%" />
                                    </div>
                                    <div className="col-md-4">
                                        <img src={`/images/${item.pdf}`} alt="" width="100%" height="100%" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}

                </div>
            </Fragment>
        )
    }

}

export default Register
