import { Container, Pagination } from 'react-bootstrap'

const Paginate = ({totalPage, load, firstPage, lastPage, page}) => {
    
    const pages = []

    for (let number = 1; number <= totalPage; number++) {
        pages.push(<Pagination.Item key={number} onClick={ () => load(number) } active={page === number}>{number}</Pagination.Item>)
    }

    // console.log(page)


    return (
        <Container>
            <Pagination>
                <Pagination.First disabled={firstPage} onClick={ () => load(1) } />
                    <Pagination.Prev />
                        <Pagination.Ellipsis />
                            {pages}
                        <Pagination.Ellipsis/>
                    <Pagination.Next/>
                <Pagination.Last disabled={lastPage} onClick={ () => load(totalPage) } />
            </Pagination>
        </Container>
    )
}

export default Paginate