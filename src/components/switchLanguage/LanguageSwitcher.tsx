import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={() => changeLanguage('en')}>English</Menu.Item>
      <Menu.Item onClick={() => changeLanguage('vi')}>Tiếng Việt</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <Button>
        Language <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default LanguageSwitcher;
