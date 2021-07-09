import { Container, Pagination } from 'react-bootstrap'


const Paginate = ({totalPage, load, currentPage, firstPage, lastPage, page, previous, next}) => {
       
    const pages = []
    let num = currentPage
    let loop = 3

    const getNum = (e) => {
        const data = (parseInt(e.target.innerHTML))
        load(data)
    }

    if (currentPage < totalPage) {
        for (let number = 1; number <= loop; number++) {
            if (currentPage === 1) {
                pages.push(<Pagination.Item key={number} onClick={(e) => getNum(e)} active={page === num}>{num++}</Pagination.Item>)
            } else {
                pages.push(<Pagination.Item key={number} onClick={(e) => getNum(e)} active={page+1 === num}>{(num++)-1}</Pagination.Item>)
            }
        }
    } else if (currentPage === totalPage) {
        for (let number = (loop + 1); number <= totalPage; number ++) {
            if (number === totalPage) {
                pages.push(<Pagination.Item key={number} onClick={(e) => getNum(e)} active={page === num}>{number}</Pagination.Item>) 
            } else {
                pages.push(<Pagination.Item key={number} onClick={(e) => getNum(e)} active={page-1 === num}>{number}</Pagination.Item>) 
            }            
        }
    }

    return (
        <Container>
            <Pagination>
                <Pagination.First disabled={firstPage} onClick={ () => load(1) } />
                    <Pagination.Prev disabled={previous} onClick={ () => load(currentPage - 1) } />
                        {pages}
                <Pagination.Next disabled={next} onClick={() => load(currentPage + 1)} />
                <Pagination.Last disabled={lastPage} onClick={ () => load(totalPage) } />
            </Pagination>
        </Container>
    )
}

export default Paginate