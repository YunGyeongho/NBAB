create table adblock_member(
	m_id varchar2(12 char) primary key, 
	m_username varchar2(10 char) not null,
	m_pw varchar2(20 char) not null,
	m_email varchar2(30 char) not null,
	m_photo varchar2(100 char) not null
);

select * from ADBLOCK_MEMBER;

drop adblock_member cascade constraint purge;

create table adblock_board2(
	b_number number(5) primary key,
	b_m_id varchar2(12 char) not null,
	b_m_username varchar2(10 char) not null,
	b_title varchar2(20 char) not null,
	b_date date not null,
	constraint b_writer foreign key(b_m_id) references adblock_member(m_id) on delete cascade
);

create sequence adblock_board_seq2;


select * from ADBLOCK_BOARD2;
drop table adblock_board cascade constraint purge;
delete ADBLOCK_BOARD2 where b_m_id = 'top7895123';


select * from (select rownum as rn, b_number, b_m_id, b_m_username, b_title, b_date from (select rownum, b_number, b_m_id, b_m_username, b_title, b_date from adblock_board where b_title like '%'||#{search}||'%') order by b_number desc) where rn &gt;= #{start} and rn &lt;= #{end}
select * from (select rownum as rn, b_number, b_m_id, b_m_username, b_title, b_date from (select rownum, b_number, b_m_id, b_m_username, b_title, b_date from adblock_board where b_title like '%테스트%') order by b_number desc) where rn >= 1 and rn <= 3


