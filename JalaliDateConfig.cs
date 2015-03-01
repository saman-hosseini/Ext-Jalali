using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Ext.Net
{
    public partial class JalaliDate
    {
        public JalaliDate(Config config)
        {
            this.Apply(config);
        }

        public static implicit operator JalaliDate(JalaliDate.Config config)
        {
            return new JalaliDate(config);
        }
    }
}
