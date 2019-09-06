const request = require('supertest');
const app = require('../server/server');
const { Course, db } = require('../server/db/index');

describe('GET courses', () => {
  it('returns all availible courses', async () => {
    const response = await request(app).get('/api/courses');
    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(3);
    expect(response.body[0]).toHaveProperty('courseName');
  });
});

describe('POST courses', () => {
  it('returns posts a new course and course content', async () => {
    const response = await request(app)
      .post('/api/courses')
      .send({
        courseName: 'Stretch Precalculus Algebra I',
        courseCode: '115',
        syllabusBody:
          'Pre-calculus college algebra without trigonometry with built-in review of basic algebra skills necessary to be successful in pre-calculus.',
      });
    expect(response.status).toEqual(201);
    expect(response.body.courseName).toBe('Stretch Precalculus Algebra I');
  });
});

describe('PUT and DELETE courses', () => {
  let course;
  beforeAll(async () => {
    course = await Course.findOne({
      where: {
        courseName: 'Stretch Precalculus Algebra I',
      },
    });
  });
  it('Edits course info based on a course ID', async () => {
    const response = await request(app)
      .put(`/api/courses/${course.id}`)
      .send({ courseName: 'Stretch PreCalc II', courseCode: '200' });
    expect(response.status).toEqual(200);
    expect(response.body.courseName).toEqual('Stretch PreCalc II');
    expect(response.body.courseCode).toEqual('200');
  });
  it('DELETE a product from the products list', async () => {
    const response = await request(app).delete(`/api/courses/${course.id}`);
    expect(response.status).toEqual(204);
  });
});

afterAll(() => db.close());
